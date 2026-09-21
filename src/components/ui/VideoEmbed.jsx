// Vertical (9:16) YouTube embed used for student testimonial videos.
export default function VideoEmbed({ id, className = '' }) {
  return (
    <div
      className={`rounded-[20px] overflow-hidden bg-black shadow-[0_14px_34px_rgba(22,26,29,.14)] aspect-[9/16] ${className}`}
    >
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title="EduSolve student testimonial"
        className="w-full h-full border-0 block"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
