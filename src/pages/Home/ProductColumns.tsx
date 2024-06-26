import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ProductModal from './ProductModal';
import StarRating from '../../organisms/StarRating';
import { Link } from 'react-router-dom';

interface ProductColumnProps {
    children: any;
}
const ProductColumns: React.FC<ProductColumnProps> = ({ children }) => {
    const { data, fetching, error } = useSelector((state: any) => state.productState);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);


    const handleEditClick = (product: any) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    // if (fetching) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(data, "data");


    return (
        <div className="container mx-auto relative h-[calc(100vh_-_120px)] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {fetching ? <div className='absolute top-[50%] left-[50%] translate-y-[50%] translate-x-[-50%]'>
                    Processing...
                </div> : data ? data?.map((product: any) => {
                    let discountAmt = product.price * (product.discountPercentage / 100);
                    let discountPrice = product?.price - discountAmt;
                    return <><div key={product?.id} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={product?.thumbnail} alt={product?.title} className="w-full h-32 object-contain rounded-t-lg" />
                        <div className="py-4 text-gray-600 flex flex-col justify-between">
                            <div>
                                <Link to={"#!"} title={product?.title} onClick={() => handleEditClick(product)}><h2 className="text-lg truncate font-bold mb-2"><u>{product?.title}</u></h2></Link>
                                <p title={product?.description} className='mb-2 truncate'>{product?.description}</p>
                                <span className="text-sm mb-2 border rounded-[5px] py-1 px-2 mb-2 inline-block">{product?.category}</span>
                                <p className="text-sm mb-2">Availability: {product?.availabilityStatus}</p>
                                <b className="text-sm">₹{discountPrice?.toFixed(2)}<del className="text-sm font-light ml-2 text-[#878787]">₹{product?.price}</del> <span className='tex-sm text-[#388e3c]'>{+product.discountPercentage}% off</span></b>
                                <div>
                                    <StarRating rating={product?.rating} />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEditClick(product)}
                                    className="bg-[#42A7C3] text-white px-4 py-1 rounded-[5px] mt-4"
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div></>
                }) : <p>No data found</p>}
            </div>
            {!fetching && children}
            {selectedProduct && (
                <ProductModal show={showModal} handleClose={handleCloseModal} product={selectedProduct} />
            )}
        </div>
    );
};

export default ProductColumns;
