function Loading() {
   return (
      <div className="min-h-screen bg-gray-700 text-white pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-blue-400 text-xl">Cargando...</p>
        </div>
      </div>
    );
}

export default Loading;
