import {Suspense,lazy} from "react";

const ContactFormV2 = lazy(() => import("./contact-us/ContactFormV2.jsx"));
function App() {
    return (
        <>
            <Suspense fallback={<div>Loading contact form...</div>}>
            <ContactFormV2/>
            </Suspense>
        </>
    )
}

export default App
