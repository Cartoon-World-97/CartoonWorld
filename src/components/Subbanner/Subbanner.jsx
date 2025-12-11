import './Subbanner.css'

const Subbanner = ({title,description}) => {
  return (
    <>
        <section className="page-header">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">{description}</p>
        </section>
    </>
  )
}

export default Subbanner
