export const mainCategory =[
    {
        name: "Men",
        categoryId:"men",
        level: 1,
        levelTwoCategory:[
            {
                "name":"Topwere",
                "categoryId":"men_topwear",
                "parentCategoryId":"men",
                "level":2
            },
            {
                "name":"Bottomwere",
                "categoryId":"men_bottomwear",
                "parentCategoryId":"men",
                "level":2
            }
        ]
    },

    {
        name: "Women",
        categoryId:"women",
        level: 1,
        levelTwoCategory:[
            {
                "name":"Fashion Dress",
                "categoryId":"women_fashion_dress",
                "parentCategoryId":"women",
                "level":2
            },
            {
                "name":"Western wear",
                "categoryId":"women_western_wear",
                "parentCategoryId":"women",
                "level":2
            }
        ]
    },
    
]