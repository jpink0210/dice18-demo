<template>
  <div class="container">
    <h1>vue & vuex Todo List example</h1>
    <hr>
    <div class="row">
      <div class="input-group col-md-4">
        <input
          type="text"
          class="form-control"
          placeholder="add Todo.."
          v-model="newTodo"
          @keyup.enter="actionAddTodo" />
        <span class="input-group-btn">
          <button class="btn btn-success" type="button" @click="actionAddTodo">
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
        </span>
      </div>
    </div>
    <!-- 左右兩個欄位分別存放 todo / done -->
    <div class="row">
      <div class="col-md-6">
        <h2>Todo List:</h2>
        <ol>
          
		  <todoItem v-for="(item, index) in todoList" :item="item" />
		  
        </ol>
      </div>
      <div class="col-md-6">
        <h2>Done List:</h2>
        <ol >
          <li v-for="(item, index) in doneList">
            <label>
              <input 
                type="checkbox"
                :checked="item.done"
                @change="toggleTodo( item.key )">
                {{ item.content }}
            </label>
          </li>
        </ol>
      </div>
    </div><!-- end row -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import todoItem from '../components/todo-item.vue';

export default {
  components: {
    todoItem
  },
  data () {
    return {
      newTodo: ''
    }
  },
  created () {
    this.tc();
    console.log(this.allState);
    console.log(this.getAllstate);
  },
  computed: mapGetters({
    todoList: 'getTodo',
    doneList: 'getDone',
    allState: 'getState',
    getAllstate: 'getAllstate',
  }),
  methods: {
    ...mapActions([
        'toggleTodo',
        'deleteTodo',
    ]),
    actionAddTodo () {
      this.$store.dispatch('addTodo', this.newTodo);
      this.newTodo = '';
    },
    tc () {
      this.$store.dispatch('tc', 22);
      console.log('tc done.');
    },
  }
}
</script>