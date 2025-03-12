export default function App(){
    return(
        <div>
            <div className="sousuo">
                <input type="text" placeholder="输入搜索的内容"/>
                    <select name="biaoqian">
                        <option value="1">全部</option>
                        <option value="2">文章</option>
                        <option value="3">视频</option>

                    </select>
                <button>搜索</button>
            </div>
            <div>
                
            </div>
            <div></div>
        </div>
    )
}