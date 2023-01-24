import './ShowReviews.css';

// ICONS
import StarIcon from '@mui/icons-material/Star';

export default function ShowReviews({ movieReviews }) {

  return (
    <div className='all--reviews--container'>
        {movieReviews.length > 0 ?
            movieReviews.map((r, i) => 
                <div className='user--review--container' key={i}>
                    <p className='first--review--user'>{r.user.name}</p>
                    <div className='review--data'>
                        <div className='review--data--rate'>
                            <p><span className="average--rating">{r.rate}</span>/5</p>
                            <StarIcon className="average--star"/>
                        </div>
                        <p className='review--data--text'>{r.review}</p>
                    </div>
                </div>
            )
        :
            <p className='review--notfound'>No reviews so far</p>
        }
    </div>
  )
}
