import { Mail, Phone } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = [
    {
        title: "Quick Links",
        items: [
            { name: "Home", url: "/" },
            { name: "About Us", url: "/about" },
            { name: "Contact", url: "/contact" },
            { name: "FAQs", url: "/faqs" },
        ],
    },
    {
        title: "Categories",
        items: [
            { name: "Fast Food", url: "/category/fast-food" },
            { name: "Salads", url: "/category/salads" },
            { name: "Desserts", url: "/category/desserts" },
            { name: "Drinks", url: "/category/drinks" },
        ],
    },
];

const socialLinks = [
    { icon: FaFacebookF, url: "https://facebook.com" },
    { icon: FaTwitter, url: "https://twitter.com" },
    { icon: FaInstagram, url: "https://instagram.com" },
    { icon: FaYoutube, url: "https://youtube.com" },
];

export default function Footer() {
    return (
        <footer className="bg-background-secondry text-foreground py-10 px-4 sm:px-6 md:px-10 lg:px-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                <div className="xs:col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
                    <h1 className="text-3xl font-bold text-primary mb-3">Foodexy</h1>
                    <p className="text-sm text-muted-foreground text-center md:text-left mb-4 max-w-xs">
                        Fresh meals, fast delivery, delicious moments!
                    </p>
                    <div className="flex gap-3">
                        {socialLinks.map(({ icon: Icon, url }, i) => (
                            <a
                                key={i}
                                href={url}
                                target="_blank"
                                className="w-10 h-10 rounded-full bg-background hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"
                            >
                                <Icon className="text-lg" />
                            </a>
                        ))}
                    </div>
                </div>
                {footerLinks.map((section, idx) => (
                    <div key={idx} className="text-center md:block hidden">
                        <h3 className="text-lg font-semibold mb-4 text-foreground">
                            {section.title}
                        </h3>
                        <ul className="space-y-3">
                            {section.items.map((link, i) => (
                                <li key={i}>
                                    <a
                                        href={link.url}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="xs:col-span-2 md:col-span-1">
                    <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Contact Us</h3>
                    <div className="mx-2 flex flex-col gap-3 items-center md:items-start">
                        <a
                            href="mailto:foodexy@example.com"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                        >
                            <Mail className="w-5 h-5" />
                            foodexy@example.com
                        </a>
                        <a
                            href="tel:+989015808529"
                            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                        >
                            <Phone className="w-5 h-5" />
                            +98 901 580 8529
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12 pt-6 border-t border-border text-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
                    <span className="text-xs text-muted-foreground mt-2">
                        © {new Date().getFullYear()} Foodexy. All rights reserved.
                    </span>
                    <div className="hidden sm:block w-px h-4 bg-border"></div>
                    <div className="flex gap-4">
                        <a href="#" className="text-xs hover:text-primary transition-colors">Terms</a>
                        <a href="#" className="text-xs hover:text-primary transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
