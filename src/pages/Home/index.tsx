import { useEffect, useState } from "react";
import Sidebar from "../../organisms/Sidebar";
import { productsListAction } from "../../redux/actions/products";
import { useAppDispatch } from "../../redux/store";
import ProductColumns from "./ProductColumns";
import Pagination from "../../organisms/Pagination";
import { useSelector } from "react-redux";


const Home = () => {
    const dispatch = useAppDispatch();
    const ShowArr = [10, 20, 30];
    const [show, setShow] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const { total } = useSelector((state: any) => state?.productState)
    const totalPages = Math.ceil(total / show);

    useEffect(() => {
        const reqObj = {
            limit: show,
            skip: (currentPage - 1) * show,
        };
        dispatch(productsListAction(reqObj));
    }, [dispatch, show, currentPage]) //api call based on the first-render/show/currentpage....

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }; //pagination handlechange func...
    const handleShowChange = (e: any) => {
        setShow(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page when the number of items to show changes
    };


    return <div className="flex">
        <div>
            <Sidebar />
        </div>
        <div className={`basis-[100%] mr-[10px] p-[25px] my-[10px] rounded-[30px] h-[calc(100vh_-_20px)] bg-[#36454F] text-white`}>
            <div className="flex justify-between items-center mb-5">
                <h4 className="text-2xl">Products</h4>
                <div>
                    <span>Show:</span>
                    <select name="show" onChange={handleShowChange}
                        className="border rounded-[5px] cursor-pointer text-black ml-2" >
                        {ShowArr?.map((el, i) => <option key={i} value={el}>{el}</option>)}
                    </select>
                </div>
            </div>
            <ProductColumns>
                <div className="mt-4">
                    <Pagination currentPage={currentPage} totalPages={totalPages} count={show} onPageChange={handlePageChange} />
                </div>
            </ProductColumns>
        </div>
    </div >
}

export default Home;