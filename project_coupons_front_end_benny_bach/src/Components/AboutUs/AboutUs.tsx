import "./AboutUs.css";

export function AboutUs(): JSX.Element {
    return (
        <div className="AboutUs">
            <header className="about-header">
                <h1>About Us</h1>
                <p>Discover amazing deals and save more with our coupons platform!</p>
            </header>
            <section className="about-content">
                <h2>Who We Are</h2>
                <p>
                    We are a passionate team dedicated to helping businesses and customers connect 
                    through the power of coupons. Our platform allows companies to promote their 
                    products and services while providing customers with unbeatable deals.
                </p>
                <h2>What We Offer</h2>
                <ul>
                    <li>Exclusive discounts across various categories.</li>
                    <li>Easy-to-use platform for browsing and redeeming coupons.</li>
                    <li>Customizable filters to find the perfect deals for you.</li>
                    <li>Real-time updates to ensure you never miss an offer.</li>
                </ul>
                <h2>Our Mission</h2>
                <p>
                    At our core, we aim to make shopping affordable and accessible for everyone.
                    We strive to support businesses by helping them grow and reach their audience
                    effectively.
                </p>
            </section>
            <footer className="about-footer">
                <p>Contact us: support@couponsplatform.com | Follow us on social media!</p>
            </footer>
        </div>
    );
}
