function AboutMe() {
    return (
        <div className="m-0 min-h-screen bg-[#fff8e8] pt-[60px] font-['Times_New_Roman',Times,serif]">
            <div className="mx-auto max-w-[800px] px-4 text-center">
                <h1 id="homeHeader" className="mb-2 text-[32px] font-bold text-slate-900">
                    About Me!
                </h1>

                <div className="mb-3 text-left">
                    <p className="mb-2 text-slate-800">
                        Hello, my name is Arthur Tunyan, and I am an upcoming 11th grader at
                        Burbank High School. I like to do different sports. For example, I
                        currently do boxing outside of school and I am on my school's
                        wrestling team. My favorite style of wrestling is Greco-Roman. I am
                        very interested in technology and I feel like learning things like
                        this will be important for my future and can potentially put me
                        ahead of others while it is not too late.
                    </p>

                    <p className="text-slate-800">
                        Some hobbies I have are spending time with family and friends,
                        playing games, playing soccer, and occasionally reading.
                    </p>
                </div>

                <img
                    src="/Images/My_Scans_137.jpg"
                    alt="Family Photo"
                    width={300}
                    height={400}
                    className="mx-auto my-2.5 h-auto max-w-full rounded-lg shadow-sm"
                />

                <p id="caption" className="text-sm text-slate-600">
                    This is a picture of my mother, father, and my cousin's son Allen.
                </p>
            </div>
        </div>
    );
}

export default AboutMe;