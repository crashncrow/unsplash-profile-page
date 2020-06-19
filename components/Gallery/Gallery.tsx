import UImage from '../UImage/UImage'

const Gallery = ({ photos }) => {
    return (
    <>
        {photos.map(({ id, urls, links, alt_description }) => (
            <UImage 
                id={id} 
                urls={urls} 
                links={links} 
                alt_description={alt_description} 
                key={id + '_component'}
                />
        ))}
    </>
    )
}

export default Gallery
