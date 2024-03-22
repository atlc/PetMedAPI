# PetMed

PetMed is a full-stack pet medicine logging app built on a Typescript+PERN stack to help keep track and manage your pets' medications. You can create households to keep all your pets under a unified umbrella, and if you petsit you can create multiple households to keep every pet grouping distinct. If you are a pet owner, you can provide temporary or permanent access to your household so that a petsitter may access your pets' medication schedules.

## Features

-   **User Authentication**: Secure user authentication system with JWTs.
-   **Account Verification**: Email verification process ensures account validity and allows for future features like passwordless logins and password resets.
-   **Medication Management**: Track pet medications, including dosage amounts, units, start and end dates, and notes.
-   **Schedule Management**: Set up medication schedules for pets, including scheduled times for doses.
-   **Logging Administration**: Log medication administration events, including administering user, time, and dose information.
-   **Image Upload**: I mean, it's an app about pets, we can't _not_ have profile pictures for your pets!

## Technologies Used

-   **Frontend**: React, TypeScript
-   **Backend**: Node.js, Express.js, TypeScript
-   **Database**: PostgreSQL
-   **Authentication**: JWT
-   **Account Verification & Other Email Features**: Mailgun
-   **File Storage**: DigitalOcean's Spaces (an S3-compatible object storage service)
-   **Development Tools**: Multer (for file uploads), AWS SDK (for S3 integration)

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/pet-medicine-tracker.git`
2. Navigate to the project directory: `cd pet-medicine-tracker`
3. Install dependencies: `npm install`
4. Set up the database - there's a [DB starter script](./src/server/utils/db/setup.sql) you can run to create the tables & update triggers
5. Set up environment variables:
    - Create a `.env` file based on the `.env.example` (with everything in a similar format to what your real values may look like).
    - Add your DigitalOcean Spaces credentials, Mailgun keys, database info, and other necessary environment variables.
6. Start the dev server: `npm run dev`
7. Visit `http://localhost:8000` in your browser to view the app.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## Disclaimer

This project is being developed for **educational purposes**. Anyone utilizing the code for personal use **assumes all risk** associated with their pets. **Always consult with your veterinarian for any questions pertaining to your pets' healthcare and wellness needs.**

## License

This project is licensed under the [MIT License](LICENSE).
