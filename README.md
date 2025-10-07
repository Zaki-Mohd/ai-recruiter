# AI Interview

An AI-powered interview preparation platform. This project is designed to help users practice for their interviews by providing AI-driven feedback and analysis.

## About the Project

AI Interview is a platform designed to help users prepare for technical and behavioral interviews. The application leverages AI to provide a realistic and interactive interview experience.

### Key Features:

*   **Mock Interviews:** Users can start a mock interview for a specific job role (e.g., "Frontend Developer").
*   **AI-Generated Questions:** The AI generates relevant interview questions based on the selected job role.
*   **Voice-to-Text:** Users can answer questions using their voice, and the application will transcribe their answers in real-time.
*   **AI-Powered Feedback:** After the interview, the AI provides detailed feedback on the user's answers, including suggestions for improvement.
*   **Interview Analysis:** The platform analyzes the user's performance and provides a summary of their strengths and weaknesses.
*   **Job Description Upload:** Users can upload a job description (in `.docx` or `.pdf` format), and the AI will tailor the interview questions to that specific role.

The goal of this project is to provide a powerful and accessible tool for anyone looking to improve their interview skills. We believe that by leveraging the power of AI, we can create a more effective and engaging learning experience.

## Getting Started

Follow these instructions to set up the project on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn
-   [Supabase CLI](https://supabase.com/docs/guides/cli)

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-interview.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ai-interview
    ```
3.  **Install the dependencies:**
    ```bash
    npm install
    ```
4.  **Set up Environment Variables:**

    You'll need to create a `.env.local` file in the root of the project to store your secret keys. To make this easier, you can copy the example file:

    ```bash
    cp .env.example .env.local
    ```

    Then, update the `.env.local` file with your actual credentials.

    #### Where to find your keys:

    *   `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANONKEY`: In your Supabase project, go to **Project Settings > API**. You'll find the Project URL and the `anon` public key there.
    *   `OPEN_ROUTER_KEY`: Get this key from the [OpenRouter](https://openrouter.ai/keys) website.
    *   `NEXT_PUBLIC_HOST_URL`: For local development, this should be `http://localhost:3000`.
    *   `NEXT_PUBLIC_VAPI_PUBLIC_KEY`: Get this key from your [Vapi AI](https://vapi.ai/) dashboard.

5.  **Set up the Database:**

    This project uses [Supabase](https://supabase.io/) for the database. The schema is managed with migration files.

    a.  **Log in to the Supabase CLI:**
        ```bash
        supabase login
        ```
    b.  **Link your local repository to your Supabase project:**
        ```bash
        supabase link --project-ref <your-project-ref>
        ```
        You can find your `<your-project-ref>` in the URL of your Supabase project dashboard (e.g., `https://app.supabase.com/project/<your-project-ref>`).

    c.  **Push the database migrations:** This will create the necessary tables and policies in your Supabase project.
        ```bash
        supabase db push
        ```

### Running the Application

Once you have completed the setup steps, you can run the application with the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Tech Stack

This project is built with the following technologies:

-   **Framework:** [Next.js](https://nextjs.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [Radix UI](https://www.radix-ui.com/), [shadcn/ui](https://ui.shadcn.com/)
-   **Database and Auth:** [Supabase](https://supabase.io/)
-   **AI Services:**
    -   [Google Generative AI](https://ai.google.dev/)
    -   [OpenAI](https://openai.com/)
    -   [Vapi AI](https://vapi.ai/)
-   **Payments:** [PayPal](https://www.paypal.com/)
-   **File Handling:**
    -   [mammoth](https://github.com/mwilliamson/mammoth.js) (for .docx files)
    -   [pdf-extraction](https://www.npmjs.com/package/pdf-extraction)
-   **Other Libraries:**
    -   [moment](https://momentjs.com/)
    -   [axios](https://axios-http.com/)
    -   [react-webcam](https://www.npmjs.com/package/react-webcam)
    -   [sonner](https://sonner.emilkowal.ski/)

## Contributing

We are excited to participate in Hacktoberfest 2024 and welcome contributions from everyone!

Please read our [**Contributing Guidelines**](CONTRIBUTING.md) to learn how you can contribute to the project. We also have a [**Code of Conduct**](CODE_OF_CONDUCT.md) that we expect all contributors to follow.

## License

This project is licensed under the [MIT License](LICENSE).

