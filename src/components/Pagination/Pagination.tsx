// import ProductCard from "../../components/ProductCard/ProductCard";
// import { Button } from "react-bootstrap";
// const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);

//   return (
//     <div className="pagination">
//       <div className="grid-paginaiton row g-0">
//         {currentProducts.map((product) => (
//           <div key={product.id} className="col-3 p-0">
//             <ProductCard product={product} />
//           </div>
//         ))}
//       </div>

//       {/* Pagination always visible */}
//       <div className="pagination-buttons d-flex justify-content-center align-items-center mt-3 gap-1">
//         <Button
//           className="btn-pagination"
//           variant="outline-secondary"
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//         >
//           &lt;
//         </Button>

//         {getPaginationButtons().map((p, idx) =>
//           typeof p === "number" ? (
//             <Button
//               key={idx}
//               className="btn-pagination"
//               variant={currentPage === p ? "warning" : "outline-warning"}
//               onClick={() => goToPage(p)}
//             >
//               {p}
//             </Button>
//           ) : (
//             <span key={idx} className="px-2">
//               ...
//             </span>
//           )
//         )}

//         <Button
//           className="btn-pagination"
//           variant="outline-secondary"
//           disabled={currentPage === totalPages}
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//         >
//           &gt;
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
