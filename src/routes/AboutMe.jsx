import styled from "styled-components";

const Page = styled.div`
  margin: 0;
  font-family: "Times New Roman", Times, serif;
  background-color: #fff8e8;
  padding-top: 60px;
`;

const Img = styled.img`
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  margin: 20px 0;
`;

function AboutMe() {
    return (
        <Page>
            <div className="info">
                <h1 id="homeHeader">About Me!</h1>

                <div className="bio">
                    <p>
                        Hello, my name is Arthur Tunyan, and I am an upcoming 11th grader at
                        Burbank High School. I like to do different sports. For example, I
                        currently do boxing outside of school and I am on my school's
                        wrestling team. My favorite style of wrestling is Greco-Roman. I am
                        very interested in technology and I feel like learning things like
                        this will be important for my future and can potentially put me
                        ahead of others while it is not too late.
                    </p>
                    <p>
                        Some hobbies I have are spending time with family and friends,
                        playing games, playing soccer, and occasionally reading.
                    </p>
                </div>

                <Img
                    src="/Images/My_Scans_137.jpg" //todo fix the pathing with this
                    alt="Family Photo"
                    width="300"
                    height="400"
                />
                <p id="caption">
                    This is a picture of my mother, father, and my cousin's son Allen.
                </p>
            </div>
        </Page>
    );
}

export default AboutMe;