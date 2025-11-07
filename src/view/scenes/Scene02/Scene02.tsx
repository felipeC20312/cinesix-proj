export const Scene02 = () => {
  return (
    <div className="from-primary to-primary-light flex h-dvh w-full items-center justify-center bg-linear-to-b">
      <div className="bg-background border-background-darker aspect-video w-4/5 overflow-hidden rounded-2xl">
        <video
          className="h-full w-full"
          src="videos/inicio_video.mp4"
          controls
        />
      </div>
    </div>
  );
};
