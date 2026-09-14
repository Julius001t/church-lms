import { useNavigate, useParams } from "react-router-dom";

export default function EnrollButton() {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleStartLearning() {
    navigate(`/courses/${id}/learn`);
  }

  return (
    <button
      onClick={handleStartLearning}
      className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
    >
      Start Learning
    </button>
  );
}