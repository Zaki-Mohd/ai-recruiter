CREATE TABLE Users (
    id bigint,
    created_at timestamp with time zone,
    credits bigint,
    email character varying,
    picture character varying,
    name character varying
);

CREATE TABLE Interviews (
    id bigint,
    created_at timestamp with time zone,
    questionList json,
    jobPosition character varying,
    duration character varying,
    type character varying,
    userEmail character varying,
    interview_id character varying,
    jobDescription character varying
);

CREATE TABLE resumes (
    id bigint,
    created_at timestamp with time zone,
    resumeText character varying,
    interview_id character varying
);

CREATE TABLE "interview-feedback" (
    id bigint,
    created_at timestamp with time zone,
    feedback json,
    recommended boolean,
    userEmail character varying,
    interview_id character varying,
    userName character varying
);