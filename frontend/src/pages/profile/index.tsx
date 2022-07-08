import Breadcrumbs from "../../components/Breadcrumbs"

const Profile = () => {
  return (
    <div className="p-10">
      <Breadcrumbs paths={[{ label: "Home", href: "/" }]} />
      <div>salam</div>
    </div>
  )
}

export default Profile
