import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "./useShowToast";

const useFollowUnFollow = (user) => {
    const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user?.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showToast = useShowToast();
    const handleFollowAndUnfollow=async()=>{
        if(!currentUser){
          showToast("Error","You need to be logged in to follow/unfollow users.","error")
          return;
        }
        if(updating){
          showToast("Error","Please wait until the current operation is complete.","error")
          return;
        }
        setUpdating(true)
        try {
          const res=await fetch(`/api/users/follow/${user._id}`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
            }
          })
          const data=await res.json()
          if(data.error){
            showToast("Error",data.error,"error")
            return
          }
          if(following){
            showToast("Success",`Unfollowed ${user.name}`,"success")
            user.followers.pop()
          }else{
            showToast("Success",`Followed ${user.name}`,"success")
            user.followers.push(currentUser._id)
          }
          setFollowing(!following)
          
        } catch (error) {
           showToast("Error",error,"error")
        }finally{
          setUpdating(false)
        }
      }
  return {handleFollowAndUnfollow,following,updating}
}

export default useFollowUnFollow
