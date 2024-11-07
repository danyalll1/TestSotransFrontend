<script setup lang="ts">
interface ICharachtrers {
  results: {
    image: string,
    name: string,
    id: number
  }[]
}

type TBaseListItem = {
  image?: string,
  name?: string,
  id: number
  list: number
}

const { data, error } = useFetch<ICharachtrers>('https://rickandmortyapi.com/api/character')
const baseList = ref<TBaseListItem[]>([])
const lists = ref({})
const filteredBaseList = computed(()=>{
  return baseList.value.filter((el)=> {
    return el.list === 0
  })
})
const listsArray = computed(() => {
  const result = []
  for (let i = 1; i <= 4; i++) {
    const filteredList = baseList.value.filter((el) => el.list === i)
    const sortedList = filteredList.sort((a, b) => {
      if (a.image && !b.image) return -1
      if (!a.image && b.image) return 1
      return 0
    })
    result.push(sortedList)
  }
  return result
})

if (data.value) {
  const firstFour = data.value.results.slice(0, 4).map(({ image, id }) => ({
    image,
    id,
    list: 0
  }))

  const secondFour = data.value.results.slice(0, 4).map(({ name, id }) => ({
    name,
    id,
    list: 0
  }))

  baseList.value = [...firstFour, ...secondFour].sort(() => Math.random() - 0.5)
}

function startDrag(evt, item:TBaseListItem) {
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('item', JSON.stringify(item))
}

function  onDrop(evt, list:number) {
  const item = JSON.parse( evt.dataTransfer.getData('item'))
  console.log(item);
  
  const itemIndex = baseList.value.findIndex((el) => {
    return el.id === item.id && 
           el.list === item.list &&
           (el.image === item.image || el.name === item.name)
  })
  if (itemIndex !== -1) {
    baseList.value[itemIndex].list = list
  }
}

const checkLists = computed(() => {
  return listsArray.value.every((list, idx) => {
    if (list.length !== 2) return false
    
    const imageItem = list.find(item => item.image)
    const nameItem = list.find(item => item.name)
    
    if (!imageItem || !nameItem) return false
    
    return imageItem.id === nameItem.id
  })
})


</script>

<template>
  <div class="wrapper">
    <div 
      class="base-list"
        @drop="onDrop($event, 0)"
        @dragover.prevent
        @dragenter.prevent
    >
      <div 
        draggable="true" 
        class="drop-item"
        v-for="item in filteredBaseList"
        @dragstart="startDrag($event,item)"
      >
        <img v-if="item.image" class="drop-item__image" :src="item.image" alt="">
        <div v-if="item.name" class="drop-item__text">{{ item.name }}</div>
      </div>
    </div>
    <div class="card-list">
      <div 
        class="card-list__card"
        v-for="(item,idx) in listsArray"
        @drop="onDrop($event, idx+1)"
        @dragover.prevent
        @dragenter.prevent
      >
        <div 
          class="card__data" 
          v-for="data in item"
          @dragstart="startDrag($event,data)"
          draggable="true" 
        >
          <img v-if="data.image" class="drop-item__image" :src="data.image" alt="">
          <div v-if="data.name" class="drop-item__text">{{ data.name }}</div>
        </div>
      </div>
    </div>
    <div class="agreement" :class="{active : checkLists}">
      Всё верно, Вабалабадабдаб
    </div>
  </div>
</template>

<style lang="scss" scoped>

*{
  box-sizing: border-box;
}
.wrapper {
  background-color: rgb(32, 35, 41);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  gap: 64px;
  padding: 128px 0;
}

.base-list{
  min-width: 848px;
  padding: 32px;
  background-color: rgb(39, 43, 51);
  min-height: 100px;
  display: grid;
  grid-template-columns: repeat(4, minmax(10px, 1fr));
  gap: 16px;
  border-radius: 8px;
}

.drop-item{
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(60, 62, 68);
  padding: 32px;
}

.drop-item__image {
    border-radius: 4px;
    width: 120px;
    height: 120px;
  }

.drop-item__text {
  border-radius: 4px;
  height: 120px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 600;
  background-color: rgba(60, 62, 68);
  color: white;
}

.card-list{
  display: flex;
  gap: 16px;

  &__card{
    border-radius: 8px;
    padding: 24px 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 16px;
    width: 160px;
    min-height: 155px;
    background-color: rgb(39, 43, 51);
  }
}

.agreement{
  transition: width ease-in-out 0.7s;
  width: 0;
  overflow: hidden;
  height: 52px;
  max-width: 848px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 600;
  background-color: rgb(85, 204, 68);
  &.active{
    width: 100%;
  }

}
</style>