import "./SideBar.css";
import Footer from "./Footer";

function SideBar() {
  return (
    <aside className='sidebar'>
      <h1 className='side-heading'>MAIN CATEGORIES</h1>
      <nav className='side-navigation'>
        <ul>
          <li>BEEF</li>
          <li>PORK</li>
          <li>LAMB</li>
          <li>FISH</li>
          <li>SEAFOOD</li>
          <li>RUBS</li>
        </ul>
      </nav>
      <Footer />
    </aside>
  )
}
export default SideBar;
