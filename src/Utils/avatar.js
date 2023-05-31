export default function CheckAvatar(author) {
    return author.avatar === 'https://react-learning.ru/image-compressed/default-image.jpg'
    ? author.name.slice(0,1)
    : author.avatar
}