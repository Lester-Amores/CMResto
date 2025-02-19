# ==============================
# Stage 1: Build Stage
# ==============================
FROM php:8.2-fpm-alpine AS build

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    nodejs \
    npm \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd

# Install Composer
COPY --from=composer:2.7.6 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy Laravel project files
COPY . .

# Set proper permissions before installing dependencies
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/storage \
    && chmod -R 775 /var/www/html/bootstrap/cache

# Install PHP and Node.js dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader \
    && npm install \
    && npm run build

# Ensure correct permissions for vendor and storage
RUN chown -R www-data:www-data /var/www/html/vendor \
    && chmod -R 775 /var/www/html/vendor

# ==============================
# Stage 2: Production Stage
# ==============================
FROM php:8.2-fpm-alpine

# Install necessary packages and nginx
RUN apk add --no-cache \
    zip \
    libzip-dev \
    freetype \
    libjpeg-turbo \
    libpng \
    freetype-dev \
    libjpeg-turbo-dev \
    libpng-dev \
    oniguruma-dev \
    gettext-dev \
    nginx \
    bash \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip pdo pdo_mysql \
    && docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/ \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-enable gd \
    && docker-php-ext-install bcmath \
    && docker-php-ext-enable bcmath \
    && docker-php-ext-install exif \
    && docker-php-ext-enable exif \
    && docker-php-ext-install gettext \
    && docker-php-ext-enable gettext \
    && docker-php-ext-install opcache \
    && docker-php-ext-enable opcache \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /var/www/html

# Copy Laravel application from build stage
COPY --from=build /var/www/html /var/www/html

# Copy the nginx and PHP configuration files
COPY ./.deploy/nginx.conf /etc/nginx/http.d/default.conf
COPY ./.deploy/php.ini "$PHP_INI_DIR/conf.d/app.ini"

# Ensure proper permissions in production
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Use non-root user
USER www-data

# Create a storage link at container startup
CMD ["sh", "-c", "php artisan storage:link && nginx -g 'daemon off;' && php-fpm"]
