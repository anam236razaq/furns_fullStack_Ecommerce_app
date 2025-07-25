import { createContext, useCallback, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { debounce } from "lodash";
import axios from "axios";

const ProductContext = createContext();

export const UseProducts = ()=> {
  return useContext(ProductContext);
}

export const ProductsProvider = ({children}) => {
    const[products, setProducts] = useState([]);
    //const[originalProducts, setOriginalProducts] = useState([]);
    const[status, setStatus]= useState("loading");
    const[selectedOption, setSelectedOption]=useState("Relevance");

    {/***Wishlist state */}
    const[wishList, setWishList] = useState(()=> {
      return JSON.parse(localStorage.getItem("wishlist"))|| [] });

     {/***CompareList state */}
    const [compareList, setCompareList] = useState(() => {
      return JSON.parse(localStorage.getItem("comparelist")) || []})

      /****Fecthing Products */
        const fetchingData = useCallback(debounce(async() => {
            try{
              setStatus('loading')
                const response = await axios.get('http://127.0.0.1:3000/api/v1/products');

                const sortedProducts = localStorage.getItem('sortedProducts');
                const savedOption = localStorage.getItem('selectedOption') || "Relevance";
                setSelectedOption(savedOption);
                setProducts(sortedProducts? JSON.parse(sortedProducts) : response.data.data.products);

                setStatus("ready");

            }catch(error){
                setStatus("error");
            }
        }, 500), []);

        useEffect(()=>{
            fetchingData()
        }, [fetchingData]);

    //Add product in product list
    function addProduct(newProduct){
      setProducts((prevProducts) => {
        const updatedProducts = [newProduct, ...prevProducts];
        localStorage.setItem('sortedProducts',JSON.stringify(updatedProducts));
        return updatedProducts;
      });

      //setOriginalProducts((prevOriginalProducts) => [newProduct, ...prevOriginalProducts]);
    }

    //Remove product from product list
    function removeProducts(productId){
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.filter(product=> product.id !== productId);
        localStorage.setItem('sortedProducts', JSON.stringify(updatedProducts));
        return updatedProducts;
      });
      //setOriginalProducts((prevOriginalProducts) => prevOriginalProducts.filter(product => product.id !== productId));
    }

    //Edit the product
    function editProduct(updatedProduct){
      setProducts((prevProducts) =>{
        const updatedProducts = prevProducts.map((product) => 
          product.id === updatedProduct.id? updatedProduct : product);
      localStorage.setItem('sortedProducts', JSON.stringify(updatedProducts));
      return updatedProducts;
      });
      /*setOriginalProducts((prevOriginalProducts) => 
        prevOriginalProducts.map((product) => 
          product.id === updatedProduct.id ? updatedProduct : product));*/
    }

    {/****Wishlist items */}
    /*useEffect(() => {
        if(wishList.length > 0) {
            localStorage.setItem('wishList', JSON.stringify(wishList));
        }
    }, [wishList]);*/

      {/****Comparelist items */}
    /*useEffect(()=> {
        if(compareList.length > 0){
            localStorage.setItem('compareList', JSON.stringify(compareList));
        }
    }, [compareList]);*/

      {/****Get Wishlist*/}
      const fetchWishList = useCallback(debounce(async() => {
        try{
          const user = JSON.parse(localStorage.getItem('ProfileData'));
          const token = localStorage.getItem('authToken');
          const response = await axios.get(`http://127.0.0.1:3000/api/v1/wishlist/${user._id}`, 
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          const updatedWishlist = response?.data?.data?.wishlist?.products;
          setWishList(updatedWishlist);
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

      }catch(error){
        if(error?.response && error?.response?.status === 404){
          setWishList([]);
          localStorage.setItem("wishlist", JSON.stringify([]));
        }else{
          setStatus("error");
        }
      }
    }, 500), []);

    useEffect(()=> {
        const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));

        if(savedWishlist && savedWishlist.length > 0){
            setWishList(savedWishlist);
        }else{
          fetchWishList();
        }
       
    }, [fetchWishList]);

    {/****AddToWishList*/}
    async function addToWishList(product){
        try{
            const user = JSON.parse(localStorage.getItem('ProfileData'));
            const token = localStorage.getItem('authToken');
            const response = await axios.post("http://127.0.0.1:3000/api/v1/wishlist/add", {
              userId: user._id,
              productId: product._id
            }, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              }
            });

            setWishList(prevWishList => {
              const updatedWishlist = [...prevWishList, product];
              localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
              return updatedWishlist;
            });

            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer,
                toast.onmouseleave = Swal.resumeTimer
              }
            })
          
            Toast.fire({
              icon: 'success',
              title: 'Added to Wishlist!',
              text: `${product.name} ${response?.data?.message}`,
            });

        }catch(error){
          setStatus("error");
        } 
    }

    {/****RemoveToWishList*/}
    async function removeToWishList(product){
        try{
          const user = JSON.parse(localStorage.getItem('ProfileData'));
          const token = localStorage.getItem('authToken');
          const response = await axios.post("http://127.0.0.1:3000/api/v1/wishlist/remove", {
            userId: user._id,
            productId: product._id
          }, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          setWishList(prevWishList => {
            const updatedWishlist = prevWishList.filter((item)=> item._id !== product._id);
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            return updatedWishlist;
          });

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer,
              toast.onmouseleave = Swal.resumeTimer
            }
          })
        
          Toast.fire({
            icon: 'error',
            title: 'Remove from Wishlist!',
            text: `${product.name} ${response?.data?.message}`,
          });

        }catch(error){
          setStatus("error");
        }
    }

    {/****Get Comparelist*/}
    const fetchCompareList = useCallback(debounce(async() => {
      try{
        const user = JSON.parse(localStorage.getItem('ProfileData'));
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://127.0.0.1:3000/api/v1/comparelist/${user._id}`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const updatedComparelist = response?.data?.data?.comparelist?.products;
        setCompareList(updatedComparelist);
        localStorage.setItem("comparelist", JSON.stringify(updatedComparelist));

    }catch(error){
      if(error?.response && error?.response?.status=== 404){
          setCompareList([]);
          localStorage.setItem("comparelist", JSON.stringify([]));
      }else{
      setStatus("error");
      }
    }
  }, 500), []);

  useEffect(()=> {
      const savedComparelist = JSON.parse(localStorage.getItem("comparelist"));

      if(savedComparelist && savedComparelist.length > 0){
        setCompareList(savedComparelist);
      }else{
        fetchCompareList();
      }
    
  }, [fetchCompareList]);

  {/****AddToCompareList*/}
  async function addToCompareList(product){
      try{
          const user = JSON.parse(localStorage.getItem('ProfileData'));
          const token = localStorage.getItem('authToken');
          const response = await axios.post("http://127.0.0.1:3000/api/v1/comparelist/add", {
            userId: user._id,
            productId: product._id
          }, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          setCompareList(prevCompareList => {
            const updatedComparelist = [...prevCompareList, product];
            localStorage.setItem("comparelist", JSON.stringify(updatedComparelist));
            return updatedComparelist;
          });

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer,
              toast.onmouseleave = Swal.resumeTimer
            }
          })
        
          Toast.fire({
            icon: 'success',
            title: 'Added to Compare!',
            text: `${product.name} ${response?.data?.message}`,
          });

      }catch(error){
          setStatus("error");
      } 
  }

  {/****RemoveToCompareList*/}
  async function removeToCompareList(product){
      try{
        const user = JSON.parse(localStorage.getItem('ProfileData'));
        const token = localStorage.getItem('authToken');
        const response = await axios.post("http://127.0.0.1:3000/api/v1/comparelist/remove", {
          userId: user._id,
          productId: product._id
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });
        setCompareList(prevCompareList => {
          const updatedComparelist = prevCompareList.filter((item)=> item._id !== product._id);
          localStorage.setItem("comparelist", JSON.stringify(updatedComparelist));
          return updatedComparelist;
        });

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer,
            toast.onmouseleave = Swal.resumeTimer
          }
        })
      
        Toast.fire({
          icon: 'error',
          title: 'Remove from Compare!',
          text: `${product.name} ${response?.data?.message}`,
        });

      }catch(error){
        setStatus("error");
      }
  }

    return (
        <ProductContext.Provider value={{products, status, selectedOption, setProducts, fetchWishList, 
          fetchCompareList, setStatus, setSelectedOption, wishList, addToWishList, removeToWishList, 
            compareList, addToCompareList, removeToCompareList, addProduct, removeProducts, editProduct,
            setWishList, setCompareList}}>
            {children}
        </ProductContext.Provider>
    )
}

