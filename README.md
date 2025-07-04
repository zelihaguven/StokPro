# StokPro - Fabric Production Tracker Web (English)

## Project Description

This is a web-based application designed to track fabric production processes. It allows users to manage orders, products, and production steps efficiently. The system aims to provide a clear overview of the production flow, from raw material to finished goods, helping businesses optimize their operations and improve tracking capabilities.

## TRY : 
https://erqubhdg.manus.space 
https://erqubhdg.manus.space/auth 

## Features

- **Company Management:** Create or join a company to manage production data collaboratively.
- **Order Management:** Add, view, edit, and track customer orders.
- **Product Management:** Define and manage various fabric products with their specifications.
- **Production Tracking:** Monitor the progress of production batches and individual items.
- **User Authentication:** Secure login and user management.
- **Email Validation:** Real-time email validation for customer email inputs to ensure data accuracy.

## Technologies Used

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend/Database:** Supabase (PostgreSQL, Authentication, Realtime, Storage)
- **Email Validation:** ZeroBounce API (with fallback to basic validation)

## Setup and Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/zelihaguven/fabric-production-tracker-web.git
    cd fabric-production-tracker-web
    ```

2.  **Install Node.js and npm (if not already installed) using nvm:**

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    nvm install node
    nvm use node
    ```

3.  **Install dependencies:**

    ```bash
    npm install
    ```

4.  **Configure Supabase:**

    -   Create a new project on [Supabase](https://supabase.com/).
    -   Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your project settings (API section).
    -   Create a `.env.local` file in the project root and add your Supabase credentials:

        ```
        VITE_SUPABASE_URL="YOUR_SUPABASE_URL"
        VITE_SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
        ```

    -   (Optional) For ZeroBounce email validation, add your API key:

        ```
        REACT_APP_ZEROBOUNCE_API_KEY="YOUR_ZEROBOUNCE_API_KEY"
        ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be accessible at `http://localhost:8080` (or another port if 8080 is in use).

## Usage

After setting up the project, you can:

-   **Register/Login:** Create a new user account or log in with an existing one.
-   **Create/Join Company:** If you are a new user, you will be prompted to create a new company or join an existing one using a company code.
-   **Manage Data:** Navigate through the dashboard to manage orders, products, and track production statuses.

---

# StokPro -  Kumaş Üretim Takip Sistemi Web Uygulaması (Türkçe)

## Proje Açıklaması

Bu, kumaş üretim süreçlerini takip etmek için tasarlanmış web tabanlı bir uygulamadır. Kullanıcıların siparişleri, ürünleri ve üretim adımlarını verimli bir şekilde yönetmelerine olanak tanır. Sistem, ham maddeden bitmiş ürünlere kadar üretim akışına net bir genel bakış sağlamayı, işletmelerin operasyonlarını optimize etmelerine ve takip yeteneklerini geliştirmelerine yardımcı olmayı amaçlamaktadır.

## Özellikler

- **Şirket Yönetimi:** Üretim verilerini işbirliği içinde yönetmek için bir şirket oluşturun veya mevcut bir şirkete katılın.
- **Sipariş Yönetimi:** Müşteri siparişlerini ekleyin, görüntüleyin, düzenleyin ve takip edin.
- **Ürün Yönetimi:** Çeşitli kumaş ürünlerini ve özelliklerini tanımlayın ve yönetin.
- **Üretim Takibi:** Üretim partilerinin ve bireysel öğelerin ilerlemesini izleyin.
- **Kullanıcı Kimlik Doğrulama:** Güvenli giriş ve kullanıcı yönetimi.
- **E-posta Doğrulama:** Veri doğruluğunu sağlamak için müşteri e-posta girişleri için gerçek zamanlı e-posta doğrulama.

## Kullanılan Teknolojiler

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend /Veritabanı:** Supabase (PostgreSQL, Kimlik Doğrulama, Gerçek Zamanlı, Depolama)
- **E-posta Doğrulama:** ZeroBounce API (temel doğrulamaya geri dönüş ile)

## Kurulum ve Yükleme

Projeyi yerel olarak kurmak için aşağıdaki adımları izleyin:

1.  **Depoyu klonlayın:**

    ```bash
    git clone https://github.com/zelihaguven/fabric-production-tracker-web.git
    cd fabric-production-tracker-web
    ```

2.  **Node.js ve npm'yi yükleyin (zaten yüklü değilse) nvm kullanarak:**

    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
    nvm install node
    nvm use node
    ```

3.  **Bağımlılıkları yükleyin:**

    ```bash
    npm install
    ```

4.  **Supabase'i yapılandırın:**

    -   [Supabase](https://supabase.com/) üzerinde yeni bir proje oluşturun.
    -   Proje ayarlarınızdan (API bölümü) `SUPABASE_URL` ve `SUPABASE_ANON_KEY` değerlerinizi alın.
    -   Proje kök dizininde `.env.local` adında bir dosya oluşturun ve Supabase kimlik bilgilerinizi ekleyin:

        ```
        VITE_SUPABASE_URL="SİZİN_SUPABASE_URLİNİZ"
        VITE_SUPABASE_ANON_ANAHTARINIZ"
        ```

    -   (İsteğe bağlı) ZeroBounce e-posta doğrulaması için API anahtarınızı ekleyin:

        ```
        REACT_APP_ZEROBOUNCE_API_KEY="SİZİN_ZEROBOUNCE_API_ANAHTARINIZ"
        ```

5.  **Geliştirme sunucusunu çalıştırın:**

    ```bash
    npm run dev
    ```

    Uygulama `http://localhost:8080` adresinden (veya 8080 kullanılıyorsa başka bir porttan) erişilebilir olacaktır.

## Kullanım

Projeyi kurduktan sonra şunları yapabilirsiniz:

-   **Kaydol/Giriş Yap:** Yeni bir kullanıcı hesabı oluşturun veya mevcut bir hesapla giriş yapın.
-   **Şirket Oluştur/Katıl:** Yeni bir kullanıcıysanız, yeni bir şirket oluşturmanız veya bir şirket kodu kullanarak mevcut bir şirkete katılmanız istenecektir.
-   **Verileri Yönet:** Siparişleri, ürünleri yönetmek ve üretim durumlarını takip etmek için kontrol panelinde gezinin.

