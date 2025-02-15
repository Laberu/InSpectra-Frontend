# Inspectra Installation Guide

This guide provides step-by-step instructions to set up and run the Inspectra application.

## Prerequisites
- Node.js and npm installed on your machine.
- Git installed on your machine.

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Laberu/InSpectra-Frontend.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd InSpectra-Frontend
   cd inspection-app
   ```

3. **Install Dependencies**
   ```bash
   npm install
   npm install gsap
   ```

3.5 **Model Transfer**
- down resource file from google drive and replace in project file

4. **Run the Project**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   - Open your browser and go to `http://localhost:3000`.
   - Select a model (currently, only "Dam Phrae" is working).
   - If prompted to sign in, use the following credentials:
     - **User:** `test2@example.com`
     - **Password:** `password123`

## Troubleshooting
- If you encounter deprecated package warnings, consider running `npm audit fix` to address any vulnerabilities.
- Ensure all dependencies are correctly installed before running the project.

## Additional Resources
- [Google Drive Folder](https://drive.google.com/drive/folders/1vhK5uxhuycVMc53CJE4Fidd0q0g0pggp?usp=drive_link)

## Notes
- The application is currently in development, and only the "Dam Phrae" model is functional.
- For any issues or further assistance, please refer to the repository or contact the maintainers.
