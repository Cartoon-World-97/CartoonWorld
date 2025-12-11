import './Categorycard.css'

const Categorycard = ({title,description,icon}) => {
  return (
    <>
          <div className="category-card">
              {icon}
              <h3 className="category-title">{title}</h3>
              <p className="category-description">
                {description}
              </p>
            </div>
    </>
  )
}

export default Categorycard
