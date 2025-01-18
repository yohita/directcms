# DirectCMS

Directus-based Website CMS

## Overview
DirectCMS is a lightweight, flexible, and scalable Content Management System (CMS) built on **Directus**. It enables seamless content management with an intuitive interface and powerful API-driven backend.

Demo : [directcms.in](http://directcms.in)
Demo Credentials to check Directus admin - Read only
Email : demo@demo.com
Password : demo123 

## Features
- **Headless CMS**: Use Directus as the backend and connect it with any frontend framework.
- **User-Friendly Admin Panel**: Easily manage content with a no-code interface.
- **Customizable**: Extend functionality using Directus extensions and APIs.
- **Role-Based Access Control (RBAC)**: Secure content with granular permissions.
- **REST & GraphQL APIs**: Fetch data in your preferred format.
- **Media Library**: Store and manage images, videos, and documents.
- **Multi-Language Support**: Manage multilingual content with ease.

## Installation
### Prerequisites
- Node.js (>=16.x)
- Docker (Optional, for containerized deployment)
- Its SQLITE Ready - You can migrate later to PostgreSQL or MySQL (Recommended Database)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/yohita/directcms.git
   cd directcms
   ```
2. **Install Dependencies**
   ```bash
   bash script-quickstart.sh
   ```
3. **Set Up OR Change Environment Variables**
   Create a `.env` file and configure Directus settings.
   ```ini
   DB_CLIENT=pg
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=directcms
   DB_USER=your_user
   DB_PASSWORD=your_password
   ```
4. **Start the CMS**
   ```bash
   
   bash script-quickstart.sh
   OR 
   node index.cjs
   OR
   npx directus start 
   ```

## Deployment
To deploy DirectCMS, you can use services like:
- **Vercel** (Frontend)
- **AWS / DigitalOcean / Linode** (Backend + Database)
- **Docker** (For containerized deployment)
- **Supabase** (For S3 Storage and Database)

### Docker Deployment
1. Build and start the container:
   ```bash
   docker-compose up -d
   ```
2. Access Directus at `http://localhost:8055`

## Licensing
This CMS is **open-source** under the **MIT License**. You are free to use, modify, and distribute it as per the MIT license terms. 
However, DirectCMS relies on Directus, which has its own licensing. Check more at:
🔗 https://directus.io/pricing/self-hosted

## Contributing
We welcome contributions! To contribute:
1. Fork the repository
2. Create a new branch (`feature/your-feature-name`)
3. Commit and push your changes
4. Submit a pull request

## Support
For issues, feature requests, or contributions, feel free to open an issue on GitHub or contact us at **support@yohita.com**.

---

Enjoy using **DirectCMS**! 🚀

