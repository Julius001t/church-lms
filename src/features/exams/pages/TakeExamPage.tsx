import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ExamQuestion from "../components/ExamQuestion";
import QuestionNavigation from "../components/QuestionNavigation";
import Timer from "../components/Timer";

import { useExam } from "../hooks/useExam";
import {
  ExamSubmissionError,
  useSubmitExam,
} from "../hooks/useSubmitExam";

export default function TakeExamPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: exam,
    isLoading,
    isError,
  } = useExam(id ?? "");

  const submitExam = useSubmitExam();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-500">
          Loading exam...
        </p>
      </div>
    );
  }

  // =====================================================
  // ERROR LOADING EXAM
  // =====================================================

  if (isError) {
    return (
      <div className="flex min-h-[500px] items-center justify-center px-6">
        <div className="max-w-md text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <span className="text-2xl">📚</span>
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            This exam is not available
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            This exam may not have been published yet,
            or it may no longer be available.
          </p>

          <Link
            to="/exams"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Exams
          </Link>

        </div>
      </div>
    );
  }

  // =====================================================
  // EXAM NOT FOUND
  // =====================================================

  if (!exam) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <p className="text-gray-500">
            Exam not found.
          </p>

          <Link
            to="/exams"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Exams
          </Link>

        </div>
      </div>
    );
  }

  // =====================================================
  // EXAM IS NOW GUARANTEED TO EXIST
  // =====================================================

  const currentExam = exam;

  const questions = currentExam.questions ?? [];

  // =====================================================
  // NO QUESTIONS
  // =====================================================

  if (questions.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <p className="text-gray-500">
            This exam has no questions yet.
          </p>

          <Link
            to="/exams"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Exams
          </Link>

        </div>
      </div>
    );
  }

  // =====================================================
  // CURRENT QUESTION
  // =====================================================

  const question = questions[currentQuestion];

  if (!question) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <p className="text-gray-500">
            Question not found.
          </p>

          <Link
            to="/exams"
            className="mt-4 inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Back to Exams
          </Link>

        </div>
      </div>
    );
  }

  // =====================================================
  // QUESTION STATE
  // =====================================================

  const selectedChoice = answers[question.id];

  const answeredQuestions = Object.keys(answers).length;

  // =====================================================
  // SELECT ANSWER
  // =====================================================

  function handleSelect(choiceId: string) {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: choiceId,
    }));
  }

  // =====================================================
  // PREVIOUS QUESTION
  // =====================================================

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  }

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  function handleNext() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  // =====================================================
  // SUBMIT EXAM
  // =====================================================

  function handleSubmit() {
    if (submitExam.isPending) {
      return;
    }

    // Do not submit until every question is answered.
    if (answeredQuestions !== questions.length) {
      return;
    }

    const payload = {
      answers: Object.entries(answers).map(
        ([questionId, choiceId]) => ({
          question: questionId,
          selected_choice: choiceId,
        }),
      ),
    };

    submitExam.mutate(
      {
        examId: currentExam.id,
        payload,
      },
      {
        onSuccess(data) {
          navigate(
            `/exams/submitted/${data.attempt_id}`,
          );
        },
      },
    );
  }

  // =====================================================
  // TIME UP
  // =====================================================

  function handleTimeUp() {
    handleSubmit();
  }

  // =====================================================
  // SUBMISSION ERROR
  // =====================================================

  const submitError = submitExam.error;

  const isNotEnrolled =
    submitError instanceof ExamSubmissionError &&
    submitError.code === "NOT_ENROLLED";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="w-full px-4 py-4 sm:px-5 lg:px-6">
      <div className="w-full space-y-4">

        {/* ================================================= */}
        {/* EXAM HEADER */}
        {/* ================================================= */}

        <div className="w-full rounded-2xl border bg-white p-5 shadow-sm sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            {/* Exam information */}

            <div>
              <p className="text-sm font-medium text-blue-600">
                {currentExam.course_title}
              </p>

              <h1 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                {currentExam.title}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {currentExam.module_title}
              </p>
            </div>

            {/* Timer */}

            <Timer
              duration={currentExam.duration}
              onTimeUp={handleTimeUp}
            />

          </div>

          {/* ================================================= */}
          {/* EXAM INFORMATION */}
          {/* ================================================= */}

          <div className="mt-4 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Duration
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {currentExam.duration} minutes
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Pass mark
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                {currentExam.pass_mark}%
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Progress
              </p>

              <p className="mt-1 font-semibold text-gray-900">
                Question {currentQuestion + 1} of{" "}
                {questions.length}
              </p>
            </div>

          </div>
        </div>

        {/* ================================================= */}
        {/* QUESTION */}
        {/* ================================================= */}

        <ExamQuestion
          question={question}
          questionNumber={currentQuestion + 1}
          selectedChoice={selectedChoice}
          onSelect={handleSelect}
        />

        {/* ================================================= */}
        {/* NAVIGATION */}
        {/* ================================================= */}

        <QuestionNavigation
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          answeredQuestions={answeredQuestions}
          isSubmitting={submitExam.isPending}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />

        {/* ================================================= */}
        {/* SUBMISSION ERROR */}
        {/* ================================================= */}

        {submitExam.isError && submitError && (
          <>
            {/* ================================================= */}
            {/* NOT ENROLLED */}
            {/* ================================================= */}

            {isNotEnrolled &&
            submitError instanceof ExamSubmissionError ? (
              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-100 text-xl">
                    ⚠️
                  </div>

                  <div className="flex-1">

                    <h2 className="font-semibold text-yellow-900">
                      You need to enroll first
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-yellow-800">
                      You need to enroll in{" "}
                      <strong>
                        {submitError.course_title ??
                          "this course"}
                      </strong>{" "}
                      before you can take this exam.
                    </p>

                    <p className="mt-2 text-sm text-yellow-700">
                      Please enroll in the course and
                      then return to the exam.
                    </p>

                    {submitError.course_id && (
                      <Link
                        to={`/courses/${submitError.course_id}`}
                        className="mt-4 inline-flex items-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Go to Course & Enroll
                      </Link>
                    )}

                  </div>
                </div>
              </div>
            ) : (

              /* ================================================= */
              /* OTHER SUBMISSION ERROR */
              /* ================================================= */

              <div className="rounded-xl border border-red-200 bg-red-50 p-5">

                <p className="font-semibold text-red-700">
                  Unable to submit exam
                </p>

                <p className="mt-1 text-sm text-red-600">
                  {submitError.message ||
                    "Something went wrong while submitting the exam."}
                </p>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}