const ProductModel =require('../Models/ProductModel') ;

exports.ProductList=async(req,res)=>{
    try{
        let pageNo = Number(req.params.pageNo);
        let perPage = Number(req.params.perPage);
        let searchValue = req.params.searchKeyword;
        let skipRow = (pageNo - 1) * perPage;

        let data;
        if (searchValue!=="0") {

            let SearchRgx = {"$regex": searchValue, "$options":"1"}
            let SearchQuery = {$or: [{title: SearchRgx}]}

            data = await ProductModel.aggregate([{
                $facet:{
                    Total:[{$match: SearchQuery},{$count: "count"}],
                    Rows:[{$match: SearchQuery},{$skip: skipRow}, {$limit: perPage}],
                }
            }])
        }
        else {
            data = await ProductModel.aggregate([{
                $facet:{
                    Total:[{$count: "count"}],
                    Rows:[{$skip: skipRow}, {$limit: perPage}],
                }
            }])
        }
        res.status(200).json({status: "success",data:data})
    }
    catch (error) {
        res.status(400).json({status: "fail",data:error})
    }

}