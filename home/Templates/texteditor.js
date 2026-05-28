const userid=document.getElementById("id-json").textContent;
const hidden=document.getElementById("Id");
hidden.value=JSON.parse(userid);
const title_text=document.getElementsByTagName("title")[0].textContent;
document.getElementById(title_text).disabled;
        
class RichTextEditor {
    constructor() {
        this.editorArea = document.getElementById('editorArea');
        this.editorContainer = document.getElementById('editorContainer');
        this.wordCount = document.getElementById('wordCount');
        
        this.initializeEventListeners();
        this.updateWordCount();
    }
    
    initializeEventListeners() {
        // Font family change
        document.getElementById('fontFamily').addEventListener('change', (e) => {
            this.execCommand('fontName', e.target.value);
        });
        
        // Font size change
        document.getElementById('fontSize').addEventListener('change', (e) => {
            this.execCommand('fontSize', '7'); // Reset to default size first
            this.setFontSize(e.target.value + 'px');
        });
        
        // Bold button
        document.getElementById('boldBtn').addEventListener('click', () => {
            this.execCommand('bold');
            this.toggleButtonState('boldBtn');
        });
        
        // Italic button
        document.getElementById('italicBtn').addEventListener('click', () => {
            this.execCommand('italic');
            this.toggleButtonState('italicBtn');
        });
        
        // Underline button
        document.getElementById('underlineBtn').addEventListener('click', () => {
            this.execCommand('underline');
            this.toggleButtonState('underlineBtn');
        });
        
        // Text color
        document.getElementById('textColor').addEventListener('change', (e) => {
            this.execCommand('foreColor', e.target.value);
        });
        
        // Background color
        document.getElementById('bgColor').addEventListener('change', (e) => {
            this.execCommand('backColor', e.target.value);
        });
        
        // Theme selector
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.changeTheme(e.target.dataset.theme);
            });
        });

        // Editor area events
        this.editorArea.addEventListener('input', () => {
            this.updateWordCount();
        });
        
        this.editorArea.addEventListener('keyup', () => {
            this.updateButtonStates();
        });
        
        this.editorArea.addEventListener('mouseup', () => {
            this.updateButtonStates();
        });
        
        // Keyboard shortcuts
        this.editorArea.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.execCommand('bold');
                        this.toggleButtonState('boldBtn');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.execCommand('italic');
                        this.toggleButtonState('italicBtn');
                        break;
                        case 'u':
                            e.preventDefault();
                            this.execCommand('underline');
                            this.toggleButtonState('underlineBtn');
                        break;
                    }
                }
            });
        }

        execCommand(command, value = null) {
            document.execCommand(command, false, value);
            this.editorArea.focus();
        }
        
        setFontSize(size) {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                if (!range.collapsed) {
                    const span = document.createElement('span');
                    span.style.fontSize = size;
                    try {
                        range.surroundContents(span);
                    } catch (e) {
                        // If surroundContents fails, extract and wrap content
                        const contents = range.extractContents();
                        span.appendChild(contents);
                        range.insertNode(span);
                    }
                    selection.removeAllRanges();
                }
            }
            this.editorArea.focus();
        }
        
        toggleButtonState(buttonId) {
            const button = document.getElementById(buttonId);
            button.classList.toggle('active');
        }
        
        updateButtonStates() {
        // Update button states based on current selection
        document.getElementById('boldBtn').classList.toggle('active', document.queryCommandState('bold'));
        document.getElementById('italicBtn').classList.toggle('active', document.queryCommandState('italic'));
        document.getElementById('underlineBtn').classList.toggle('active', document.queryCommandState('underline'));
    }

    updateWordCount() {
        const text = this.editorArea.innerText || this.editorArea.textContent;
        const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
        const characters = text.length;
        
        this.wordCount.textContent = `Words: ${words} | Characters: ${characters}`;
    }
    
    changeTheme(theme) {
        // Remove all theme classes
        this.editorContainer.classList.remove('light', 'dark', 'sepia');
        
        // Add selected theme class
        if (theme !== 'light') {
            this.editorContainer.classList.add(theme);
        }
        
        // Update active theme button
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    }
}
    
    // Initialize the editor when the page loads
    document.addEventListener('DOMContentLoaded', () => {
        const blog_context=new RichTextEditor();
    });
    
       function send_data(page,data) {
    const message = "page_loaded";
    switch (page) {
        case 'home':
            fetch("/Home/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                // body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
            
        case 'display_blog':
            fetch("/Blog_display", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
        case 'Profile':
            fetch("/profile/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
        case 'write_blog':
            fetch("/Blog_creation/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                // body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
        case 'New':
            fetch("/new/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                // body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
        case 'Category':
            fetch("/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": "{{ csrf_token }}"  // Only needed if you're POSTing from a Django template
                },
                // body: JSON.stringify({ status: data })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Server response:", data);
            });
            break;
    }
}