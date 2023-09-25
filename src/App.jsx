import "./App.css";
import Layout from "./components/Layout/Layout";
import Carousel from './components/Carousel';
import MovieList from "./components/List/MovieList";

function App() {
  return (
    <Layout>
      <div className="">
        <Carousel/>
        <MovieList/>
      </div>
    </Layout>
  );
}
export default App;
