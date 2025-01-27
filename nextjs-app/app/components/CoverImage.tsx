import Image from 'next/image';

interface CoverImageProps {
  image: { src: string; alt: string }; // Adjust to match the shape of the `image` object
}

const CoverImage: React.FC<CoverImageProps> = ({ image }) => {
  return <Image src={image.src} alt={image.alt} layout="responsive" width={1200} height={675} />;
};
