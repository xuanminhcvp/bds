import { VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import PropertyDetails from "../components/propertydetails";
import Footer from "../components/footer";
import { Property } from "./types.ts"


const fakeProperty: Property = {
  id: "1",
  title: "Luxury Villa in Beverly Hills",
  description: "A beautiful and spacious villa with a stunning view of the hills. Perfect for family vacations or a peaceful retreat.",
  price: 5000000,
  images: [
      "https://picsum.photos/600/800",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
      "https://picsum.photos/300/400",
  ],
  location: "Beverly Hills, CA",
  contactInfo: {
      name: "John Doe",
      phone: "+1 (555) 123-4567",
      email: "johndoe@example.com",
  },
};

const PropertyPage = () => {
    return (
        <VStack>
            <Header />
            <PropertyDetails />
            <Footer />
        </VStack>
    );
};

