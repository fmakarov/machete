 import React, { useState, useEffect } from "react";
 import Layout from "../pages/layout";

 export default function ServicePages({ pageContext: { name, description } }) {
   return (
     <Layout>
       <div className="max-w-7xl mx-auto py-16">
         <div className="flex-col">
           <div className="text-gray-500 text-sm pb-10">
             Услуги / {name}
           </div>
           <div className="flex space-x-5 mx-auto">
             <div className="w-2/3">
               <h1 className="text-2xl font-header font-semibold">{name}</h1>
             </div>
           </div>
         </div>
         <div>{description}</div>
       </div>
     </Layout>
   );
 }
