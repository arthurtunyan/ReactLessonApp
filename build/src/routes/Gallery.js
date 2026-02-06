import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Page = styled.div `
    margin: 0;
    font-family: "Times New Roman", Times, serif;
    background-color: #fff8e8;
    padding-top: 60px;
`;
const Img = styled.img `
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
    return (_jsx(Page, { children: _jsxs("div", { className: "info", children: [_jsx("h1", { id: "homeHeader", children: "Image Gallery" }), _jsx("div", { className: "gallery", children: images.map((src, idx) => (_jsx(Img, { src: src, alt: "Dog" }, `${src}-${idx}`)
                    //basically images is an array so i just maped through each one and src just gets the path adn the idx is index, each src returns an <Img src={src} alt="Dog" />
                    )) })] }) }));
}
export default Gallery;
//# sourceMappingURL=Gallery.js.map
//# sourceMappingURL=Gallery.js.map