
import { useParams,Link} from "react-router-dom"
import { useState,useEffect } from "react";
export default function BookDetail(){

    const {bookId} = useParams();
    const [bookDetail,setBookDetail] = useState([]);

    const getBookById_URL = `http://localhost:5400/bookapi/v1/getBookById/${bookId}`;
    useEffect(() =>{
        fetch(getBookById_URL)
        .then((response) => response.json())
        .then((data) =>{
            console.log(data.book);
            setBookDetail(data.book);

        })
        .catch(error => console.error(error))

        


    },[getBookById_URL])
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Language</th>
                        <th>Category</th>
                        <th>Year</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{bookDetail.name}</td>
                        <td>{bookDetail.author}</td>
                        <td>{bookDetail.language}</td>
                        <td>{bookDetail.category}</td>
                        <td>{bookDetail.year}</td>
                        <td>{bookDetail.rating}</td>
                    </tr>
                </tbody>
            </table>
            <Link>Edit</Link>
            
        </div>
    )
}