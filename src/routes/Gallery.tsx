const images = [
    "/Images/dog1.jpg",
    "/Images/dog2.jpg",
    "/Images/dog3.jpg",
    "/Images/dog4.jpg",
    "/Images/dog5.jpg",
    "/Images/dog6.jpg",
    "/Images/dog1.jpg",
    "/Images/dog2.jpg",
    "/Images/dog3.jpg",
    "/Images/dog4.jpg",
    "/Images/dog5.jpg",
    "/Images/dog6.jpg",
];

export default function Gallery() {
    return (
        <div className="m-0 min-h-screen bg-white pt-14 font-serif">
            <div className="mx-auto mb-8 flex w-full max-w-[900px] justify-center px-4">
            </div>

            <div className="mx-auto mb-3 w-full max-w-[900px] px-4 text-center">
                <h1 id="homeHeader" className="mb-2 text-[32px] font-bold text-slate-900">
                    Image Gallery
                </h1>
                <p className="text-sm text-slate-500">i tried my best using tailwind</p>
            </div>

            <div className="mx-auto w-full max-w-[900px] px-4 pb-12">
                <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-4">
                    {images.map((src, idx) => (
                        <div key={`${src}-${idx}`} className="mb-3 break-inside-avoid sm:mb-4">
                            <div className="overflow-hidden rounded-lg ring-1 ring-black/5 shadow-sm">
                                <img
                                    src={src}
                                    alt="Dog"
                                    loading="lazy"
                                    className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}