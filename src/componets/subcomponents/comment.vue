<template>
 <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
<textarea placeholder="请输入要发表的评论（评论内容不超过100字）" maxlength="100" v-model="msg"></textarea>
<mt-button type="primary" size="large" @click="postcomments">发表评论</mt-button>
<div class="cmt-list" >
    <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
        <div class="cmt-title">
         第{{i+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time |dateFormat}}

        </div>
        <div class="cmt-body">
        {{item.content ==='undefind'?'此用户很懒':item.content}}
        </div>
    </div>
 </div>

    
     <mt-button type="danger" size="large" plain @click="getmore">加载更多</mt-button>
</div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageIndex:1,
            comments:[],
            msg:'',
        }
    },
   created(){
        this.getcomments()
    },
     props:["id"],//父组件传值
    methods: {
        getcomments(){
            this.$http.get("api/getcomments/" + this.id+ "?pageindex="+this.pageIndex).then(result=>{
                if(result.body.status===0){
                    this.comments=this.comments.concat(result.body.message)
                    Toast('获取评论成功')
                }else{
                    Toast('获取失败')
                    
                }
            })
        },
        getmore(){
            this.pageIndex++;
            this.getcomments();
            console.log(this.comments)
        },
        postcomments(){
            if(this.msg.trim().length===0){
                return Toast('内容不能为空');
            }
            
            this.$http.post("api/postcomment/" + this.$route.params.id,{content:this.msg.trim()})
            .then(result=>{
                    if(result.body.status ===0){
                        var cmt = {
                            user_name:"匿名用户",
                            add_time:Date.now(),
                            content:this.msg.trim()
                        };
                        this.comments.unshift(cmt);
                        this.msg=''
                        Toast('评论成功')
                        console.log(this.comments)
                    }else{
                        Toast('评论失败')
                    }
            });
        }
    },
   
}
</script>

<style lang = "scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
    
    .cmt-list{
        margin: 5px 0;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #ccc;
                line-height: 30px;
            }
            .cmt-body{
                span{
                    font-size: 16px;
                    font-weight: 700;
                }
                line-height: 35px;
                text-align: center;
                line-height: 150%;
            }
        }
    }
   } 
    
    
</style>