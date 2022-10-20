import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'css/styles.css';
import { Searchbar } from 'components/Searchbar';
import { ImageGalleryHub } from 'components/ImageGalleryHub';

export const App = () => {
  const initialValue = 1;

  const [page, setPage] = useState(initialValue);
  const [perPage, setPerPage] = useState(12);
  const [query, setQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [total, setTotal] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  function handleFormSubmit({ query }) {
    if (!query.trim().toLowerCase()) {
      return toast.warn('Please let us know your query item');
    }
    setPage(initialValue);
    setPerPage(12);
    setQuery(query.trim().toLowerCase());
    setGallery([]);
    setTotal(null);
    setTotalHits(null);
  }

  return (
    <>
      <Searchbar onFormSubmit={handleFormSubmit} />
      <ImageGalleryHub
        page={page}
        perPage={perPage}
        query={query}
        gallery={gallery}
        total={total}
        totalHits={totalHits}
      />
      <ToastContainer position="top-left" autoClose={5000} />
    </>
  );
};

// export class protoApp extends Component {
//   static defaultProps = {
//     initialValue: 1,
//   };
//   state = {
//     page: this.props.initialValue,
//     query: '',
//     gallery: [],
//     total: null,
//     totalHits: null,
//   };

//   handleFormSubmit = ({ query }) => {
//     const q = query.trim().toLowerCase();
//     if (q === '') {
//       return toast.warn('Please let us know your query item');
//     }
//     this.setState({
//       page: this.props.initialValue,
//       query: q,
//       gallery: [],
//       total: null,
//       totalHits: null,
//     });
//   };

//   render() {
//     const { page, query, gallery, total, totalHits } = this.state;
//     return (
//       <>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         <ImageGalleryHub
//           page={page}
//           query={query}
//           gallery={gallery}
//           total={total}
//           totalHits={totalHits}
//         />
//         <ToastContainer position="top-left" autoClose={5000} />
//       </>
//     );
//   }
// }
