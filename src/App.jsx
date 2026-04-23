import Navbar from './components/Navbar';
import HeroSection from './page/HeroSection';
import About from './components/About';
import Cards from './components/Cards';
import { Route, Routes } from 'react-router-dom';
import Contact from './page/Contact';
import HtmlCss from './skills/HtmlCss';
import Login from './page/Login';
import AddHtmlProject from './page/AddHtmlProject';
import Resetpass from './page/Resetpass';
import AddJsProject from './page/AddJsProject';
import AddReactProject from './page/AddReactProject';
import ProjectCard from './components/ProjectCard';
import AllProject from './page/AllProject';
import ViewUi from './page/ViewUi';


function App() {
  return (
    <div className="bg-black text-white font-sans scroll-smooth">

      <Navbar />
      <Routes>
        <Route path='/' element={<HeroSection />} />
        <Route path='/:projectType/:id/uitemplate' element={<ViewUi />} />
        <Route path='/:projectType/allproject' element={<AllProject />} />
        <Route path='/skills' element={<Cards />} />
        <Route path='/about' element={<About />} />
        <Route path='/htmlcss' element={<HtmlCss />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/resetpass' element={<Resetpass />} />
        <Route path='/addhtmlproject' element={<AddHtmlProject />} />
        <Route path='/addjsproject' element={<AddJsProject />} />
        <Route path='/addreactproject' element={<AddReactProject />} />
      </Routes>
      
    </div>
  );
}


export default App

