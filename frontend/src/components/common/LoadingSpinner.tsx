
const LoadingSpinner = ({ message = '' }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-2 justify-center items-center bg-white h-16">
        <div className="h-3 w-3 bg-blue rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-3 w-3 bg-blue rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-3 w-3 bg-blue rounded-full animate-bounce"></div>
      </div>
      <h1 className="text-blue text-xl underline">{message}</h1>
    </div>
  );
};

export default LoadingSpinner;
