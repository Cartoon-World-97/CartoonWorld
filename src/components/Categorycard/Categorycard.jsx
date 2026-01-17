import './Categorycard.css'

const Categorycard = ({title,description,icon}) => {
  return (
    <>
    <div className='col-lg-4' >
          <div className=" category-card h-100">
                {icon}
              <h3 className="category-title">{title}</h3>
              <p className="category-description">
                {description}
              </p>
            </div>
            </div>
    </>
  )
}

export default Categorycard
