import React from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../../redux/actions/products';

interface ProductModalProps {
    show: boolean;
    handleClose: () => void;
    product: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ show, handleClose, product }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = React.useState(product);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProduct(formData));
        handleClose();
    };


    return (
        <div className="fixed inset-0 flex items-center text-black justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] overflow-y-auto">
                <h2 className="text-2xl mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className='w-[250px] h-[250px] mx-auto'>
                        <img className='mx-auto' src={formData?.thumbnail} alt="img" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData?.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData?.category}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData?.price}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Availability Status</label>
                        <input
                            type="text"
                            name="availabilityStatus"
                            value={formData?.availabilityStatus}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            value={formData?.rating}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={handleClose} className="border px-4 py-2 rounded-[5px] mr-2">Cancel</button>
                        <button type="submit" className="bg-[#42A7C3] text-white px-4 py-2 rounded-[5px] rounded">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;
