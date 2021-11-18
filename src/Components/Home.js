import React,{useState, useEffect} from 'react'
import Pagination from './Pagination'
import { Navbar } from './Navbar'
import { Products } from './Products'
import {auth,fs} from '../Config/Config'

export const Home = (props) => {


    // getting current user uid 
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().FullName);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
   
    
    // state of products
    const [products, setProducts]=useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [disablePages, setDisablePages] = useState({
        next: false,
        prev: false
    });

    // getting products function
    const getProducts = async ()=>{
        await fs.collection('Products').limit(4).get().then((collections) => {
            const products = collections.docs.map((p) => p.data());
            const lastDoc = collections.docs[collections.docs.length - 1];
            setLastDoc(lastDoc);
            setProducts(products);
        })
    }

    const nextPage = () => {
        fs.collection('Products').startAfter(lastDoc).limit(4).get()
        .then((collections) => {
            if (collections.size !== 0) {
            const products = collections.docs.map((p) => p.data());
            const lastDoc = collections.docs[collections.docs.length - 1];
            setLastDoc(lastDoc);
            setProducts(products);
            } else {
                setDisablePages({next: true, prev: false});
            }
        })
    }

    const prevPage = () => {
        fs.collection('Products').endBefore(lastDoc).limit(4).get()
        
        .then((collections) => {
            if (collections.size >= 4) {
            const products = collections.docs.map((p) => p.data());
            const lastDoc = collections.docs[collections.docs.length - 1];
            setLastDoc(lastDoc);
            setProducts(products);
            } else {
              setDisablePages({
                next: false,
                prev: true
              })
            }
        })
    }

    useEffect(()=>{
        getProducts();
    },[])

    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{        
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const qty = snapshot.docs.length;
                    setTotalProducts(qty);
                })
            }
        })       
    },[])  

    // globl variable
    let Product;

    // add to cart
    const addToCart = (product)=>{
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            props.history.push('/login');
        }
        
    }
    console.log(products);
    return (
        <>
            <Navbar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
            <Pagination disablePages={disablePages} nextPage={nextPage} prevPage={prevPage}/>
        </>
    )
}
