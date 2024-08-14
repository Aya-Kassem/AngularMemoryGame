import { Injectable } from "@angular/core";
import { ImageInterface } from './images.interface';

@Injectable()
export class ImagesService {
    // readonly images: string[] = [
    //     '../../../assets/Images/image-1.jpg', '../../../assets/Images/image-2.jpg',
    //     '../../../assets/Images/image-3.jpg', '../../../assets/Images/image-4.jpg',
    //     '../../../assets/Images/image-5.jpg', '../../../assets/Images/image-6.jpg',
    //     '../../../assets/Images/image-7.jpg', '../../../assets/Images/image-8.jpg',
    //     '../../../assets/Images/image-9.jpg', '../../../assets/Images/image-10.jpg',
    //     '../../../assets/Images/image-11.jpg', '../../../assets/Images/image-12.jpg',
    //     '../../../assets/Images/image-13.jpg', '../../../assets/Images/image-14.jpg',
    //     '../../../assets/Images/image-15.jpg', '../../../assets/Images/image-16.jpg',
    //     '../../../assets/Images/image-17.jpg', '../../../assets/Images/image-18.jpg',
    //     '../../../assets/Images/image-19.jpg', '../../../assets/Images/image-20.jpg',
    //     '../../../assets/Images/image-21.jpg', '../../../assets/Images/image-22.jpg',
    //     '../../../assets/Images/image-23.jpg', '../../../assets/Images/image-24.jpg',
    //     '../../../assets/Images/image-25.jpg', '../../../assets/Images/image-26.jpg',
    //     '../../../assets/Images/image-27.jpg', '../../../assets/Images/image-28.jpg',
    //     '../../../assets/Images/image-29.jpg', '../../../assets/Images/image-30.jpg',
    // ];

    readonly images: string[] = [
        './assets/Images/image-1.jpg', './assets/Images/image-2.jpg',
        './assets/Images/image-3.jpg', './assets/Images/image-4.jpg',
        './assets/Images/image-5.jpg', './assets/Images/image-6.jpg',
        './assets/Images/image-7.jpg', './assets/Images/image-8.jpg',
        './assets/Images/image-9.jpg', './assets/Images/image-10.jpg',
        './assets/Images/image-11.jpg', './assets/Images/image-12.jpg',
        './assets/Images/image-13.jpg', './assets/Images/image-14.jpg',
        './assets/Images/image-15.jpg', './assets/Images/image-16.jpg',
        './assets/Images/image-17.jpg', './assets/Images/image-18.jpg',
        './assets/Images/image-19.jpg', './assets/Images/image-20.jpg',
        './assets/Images/image-21.jpg', './assets/Images/image-22.jpg',
        './assets/Images/image-23.jpg', './assets/Images/image-24.jpg',
        './assets/Images/image-25.jpg', './assets/Images/image-26.jpg',
        './assets/Images/image-27.jpg', './assets/Images/image-28.jpg',
        './assets/Images/image-29.jpg', './assets/Images/image-30.jpg',
    ];

    // Change Images Order in Images Array before Extract Images ...
    shuffle(array: string[]): string[] {
        return array.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value);
    }

    // Extract Images After Array Shuffle based on Images Count for Each Level ...
    getRandomImages(count: number): string[] {
        const shuffled = this.shuffle(this.images);
        return shuffled.slice(0, count);
    }

    // Getting the Images from the Array and Duplicate them for Creating Pairs & Shuffle Them Again to Random Order ...
    getImagesForLevel(levelImagesCount: number): ImageInterface[] {
        const imageCount = levelImagesCount;
        const selectedImages = this.getRandomImages(imageCount);
        const allImages = [...selectedImages, ...selectedImages];
        const shuffledImages = this.shuffle(allImages);

        // Create data attribute to all Images to be Used for Check for Match ...
        return shuffledImages.map(image => ({
            src: image,
            data: image.slice(image.indexOf('image-'), image.lastIndexOf('.'))
        }));
    }
}
