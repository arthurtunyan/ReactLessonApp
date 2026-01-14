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

function Gallery() {
    return (
        <Page>
            <div className="info">
                <h1 id="homeHeader">Image Gallery</h1>

                <div className="gallery">
                    {images.map((src, idx) => (
                        <Img key={`${src}-${idx}`} src={src} alt="Dog"/>
                        //basically images is an array so i just maped through each one and src just gets the path adn the idx is index, each src returns an <Img src={src} alt="Dog" />
                    ))}
                </div>
            </div>
        </Page>
    );
}

export default Gallery;