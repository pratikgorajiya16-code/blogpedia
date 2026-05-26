let Index=0;
        function send_data() {
    const message = "page_loaded";

    fetch("{% url 'Home' %}", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
        },
        body: JSON.stringify({ status: "{{userid}}" })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Server response:", data);
    });
}


function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) { 
        
        // Generate random index 
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}    
    
    const sampleData = [
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:108},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:109},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:110},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:111},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:112},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:113},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:114},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:115},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:116},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:117},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:118},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:119},
        {Blog_Author: "Levi"
        ,Blog_category: "Killua", Blog_title: "Thorfinn",Blog_image: "/placeholder.svg?height=120&width=150",
        Blog_entry_date: "text",
        Blog_likes: "button",
        Blog_characters: "text",
        Blog_id:120}
    ];
    
    const layoutContainer = document.getElementById('layoutContainer');
    
    function generateLayoutPair() {
        for (let i = 0; i < 2; i++) {
            const layoutDiv = document.createElement('div');
            layoutDiv.className = 'generated-layout';
            
            if (sampleData[Index]){
                const object=sampleData[Index]
                Index++;
                const nodeList = createelement(object);
                nodeList.forEach(node => layoutDiv.appendChild(node));
                
                layoutContainer.appendChild(layoutDiv);
                layoutDiv.dataset.blogId=object.Blog_id;
                layoutDiv.addEventListener('click', function () {
                    console.log("Clicked via addEventListener", this.dataset.blogId);
                    display_blog(this.dataset.blogId);
                    });
            }else{
                return;
            }
        }
    }
    
    function createelement(object) {
        const nodes = [];
        
        for (const element in object) {
            let node=null;
            switch (element) {
                case 'Blog_title':
                    node = title(object[element]);
                    break;
                    case 'Blog_Author':
                        node = generate_author(object[element]);
                        break;
                        case 'Blog_likes':
                            node = likes(object[element]);
                            break;
                            case 'Blog_characters':
                                node = Character(object[element]);
                                break;
                                case 'Blog_category':
                                    node = category(object[element]);
                                    break;
                                    case 'Blog_entry_date':
                                        node = date(object[element]);
                        break;
                        case 'Blog_image':
                            node = Image(object[element]);
                            break;
                        default:
                            continue;
                        }
                        if (node) nodes.push(node);
                    }
                    return nodes;
                }
                
                
    function display_blog(id){
        alert("You dare challenge "+id);
    }
                
                
    function generate_author(content){
        node = document.createElement('p');
        node.textContent = content;
        Object.assign(node.style,{
            fontSize: '14px',
            fontWeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '20px',
            top: '20px',
            width: '60px',
            height: '20px'
        });
        return node;
    }
    
    function category(content){
        node = document.createElement('p');
        node.textContent = content;
        Object.assign(node.style,{
            fontSize: '14px',
            fontWeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '100px',
            top: '20px',
            width: '60px',
            height: '20px'
        });
        return node;
    }
    
    function title(content){
        node = document.createElement('p');
        node.textContent = content;
        Object.assign(node.style,{
            fontSize: '48px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            position: 'absolute',
            left: '40px', 
            top: '80px',
            width: '200px',
            height: '80px'
        });
        return node;
    }
    
    function Image(content){
        node = document.createElement('img');
        node.src = content;
        node.alt = 'Generated image';
        
        Object.assign(node.style,
        { objectFit: 'contain',
        position: 'absolute',
        left: '320px',
        top: '80px',
        width: '150px',
        height:'120px' });
        return node;
    }
    
    function date(content){
        node = document.createElement('p');
        node.textContent = content;
        Object.assign(node.style, {
            fontSize:'14px',
            fontWeight:'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '20px',
            top: '200px',
            width: '40px',
            height: '20px'
        });
        return node;
    }
    
    function likes(content){
        node = document.createElement('button');
        node.textContent = content;
        Object.assign(node.style, {
            fontSize: '12px',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
            position: 'absolute',
            left: '80px',
            top: '200px',
            width: '60px',
            height: '20px'
        });
        return node;
    }
    
    function Character(content){
        node = document.createElement('p');
        node.textContent = content;
        Object.assign(node.style, {
            fontSize: '14px',
            fontWeight: 'normal',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: '160px',
            top: '200px',
            width: '40px',
            height: '20px'
        });
        return node;
    }
    
    
    
    document.addEventListener('DOMContentLoaded', () => {
        send_data();
        // const data="{{ display_data }}";
        // const display_data=data.split("+");
        // const final_data=shuffle(display);
        generateLayoutPair(); // Initial pair
        generateLayoutPair(); // Second pair for scroll
        generateLayoutPair();
    });
    
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            generateLayoutPair();
            generateLayoutPair();
            generateLayoutPair();
        }
    });