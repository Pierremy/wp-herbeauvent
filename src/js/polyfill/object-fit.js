export default class ObjectFit {
    static init() {
        if ('objectFit' in document.documentElement.style === false) {
            const scriptImage = document.createElement('script');
            const scriptVideo = document.createElement('script');

            scriptImage.addEventListener('load', () => { objectFitImages() });
            scriptVideo.addEventListener('load', () => { objectFitVideos() });

            scriptImage.src = 'https://cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.min.js';
            scriptVideo.src = 'https://cdn.jsdelivr.net/npm/object-fit-videos@1.0.4/object-fit-videos.min.js';

            document.body.appendChild(scriptImage);
            document.body.appendChild(scriptVideo);
        }
    }

    static reload() {
        if ('objectFit' in document.documentElement.style === false) {
            objectFitImages();
            objectFitVideos();
        }
    }
}